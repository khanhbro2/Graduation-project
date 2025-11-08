package com.phucanhduong.utils;

import com.phucanhduong.config.VNPayConfig;
import com.phucanhduong.constant.AppConstants;
import com.phucanhduong.dto.VNpayResult;
import com.phucanhduong.dto.client.ClientConfirmedOrderResponse;
import com.phucanhduong.entity.cashbook.PaymentMethodType;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@AllArgsConstructor
public class VNpayService {
    private final VNPayConfig vnpayConfig;
    public String hmacSHA512(String key, String data) {
        try {
            Mac hmac = Mac.getInstance("HmacSHA512");
            SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(), "HmacSHA512");
            hmac.init(secretKeySpec);
            byte[] result = hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
            return String.format("%064x", new BigInteger(1, result));
        } catch (Exception e) {
            return "";
        }
    }

    public VNpayResult handleResult(Map<String, String[]> paramMap) {
        VNpayResult vnpayResult = new VNpayResult ();
        String vnp_ResponseCode = paramMap.get("vnp_ResponseCode")[0];
        String vnp_TransactionStatus = paramMap.get("vnp_TransactionStatus")[0];
        String vnp_TxnRef = paramMap.get("vnp_TxnRef")[0];
        System.out.println("vnp_ResponseCode = " + vnp_ResponseCode);
        System.out.println("vnp_TransactionStatus = " + vnp_TransactionStatus);
        // todo: check vnpay hash
        try {
            if (vnp_ResponseCode.equals("00") && vnp_TransactionStatus.equals("00")) {
                System.out.println("Thanh toan thanh cong");
                vnpayResult.setSuccess(true);
            } else {
                System.out.println("Thanh toan that bai");
                vnpayResult.setSuccess(false);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        vnpayResult.setOrderId(vnp_TxnRef);
        return vnpayResult;
    }

    public String getPayUrl(String orderId, int totalPrice) {
        try {
            // Set timezone
            TimeZone.setDefault(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));

            LocalDateTime datetime = LocalDateTime.now();
            DateTimeFormatter createDateFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
            String createDate = datetime.format(createDateFormatter);
            LocalDateTime expireDate = datetime.plusMinutes(15);
            String expireDateStr = expireDate.format(createDateFormatter);
            String ipAddr = "14.186.247.43";


            Map<String, String> vnpParams = new HashMap<>();
            vnpParams.put("vnp_Version", "2.1.1");
            vnpParams.put("vnp_Command", "pay");
            vnpParams.put("vnp_TmnCode", vnpayConfig.getVnp_TmnCode());
            vnpParams.put("vnp_Locale", "vn");
            vnpParams.put("vnp_CurrCode", "VND");
            vnpParams.put("vnp_TxnRef", orderId);
            vnpParams.put("vnp_OrderInfo", "Thanh toan cho ma GD:" + orderId);
            vnpParams.put("vnp_OrderType", "billpayment");
            vnpParams.put("vnp_Amount", String.valueOf(totalPrice)+"00");
            vnpParams.put("vnp_ReturnUrl", vnpayConfig.getVnp_ReturnUrl());
            vnpParams.put("vnp_IpAddr", ipAddr);
            vnpParams.put("vnp_CreateDate", createDate);
            vnpParams.put("vnp_ExpireDate", expireDateStr);

            // Sort parameters
            List<String> fieldNames = new ArrayList<>(vnpParams.keySet());
            Collections.sort(fieldNames);

            // Build hash data
            StringBuilder hashData = new StringBuilder();
            StringBuilder query = new StringBuilder();
            Iterator<String> itr = fieldNames.iterator();
            while (itr.hasNext()) {
                String fieldName = itr.next();
                String fieldValue = vnpParams.get(fieldName);
                if ((fieldValue != null) && (!fieldValue.isEmpty())) {
                    hashData.append(fieldName);
                    hashData.append('=');
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII));
                    if (itr.hasNext()) {
                        query.append('&');
                        hashData.append('&');
                    }
                }
            }

            // Create secure hash
            String secureHash = hmacSHA512(vnpayConfig.getSecretKey(), hashData.toString());
            query.append("&vnp_SecureHash=").append(secureHash);

            // Build payment URL

            return vnpayConfig.getVnp_PayUrl() + "?" + query;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void main(String[] args) {
        var cfg=new VNPayConfig();

        cfg.setVnp_PayUrl("https://sandbox.vnpayment.vn/paymentv2/vpcpay.html");
        cfg.setVnp_ReturnUrl("http://localhost:8085/vnpay/return");
        cfg.setVnp_TmnCode("4FRV9TJJ");
        cfg.setSecretKey("HV58GJB2A8CF07K6DI5J0VN036NALUXF");
        cfg.setVnp_ApiUrl("https://sandbox.vnpayment.vn/merchant_webapi/api/transaction");
        BigDecimal a = new BigDecimal("35750000.00000");

        VNpayService vNpayService = new VNpayService(cfg);
        System.out.println(vNpayService.getPayUrl("123", a.intValue()));
    }

}
