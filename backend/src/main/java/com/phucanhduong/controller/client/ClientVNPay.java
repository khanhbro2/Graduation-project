package com.phucanhduong.controller.client;

import com.phucanhduong.constant.AppConstants;
import com.phucanhduong.constant.FieldName;
import com.phucanhduong.constant.ResourceName;
import com.phucanhduong.entity.general.Notification;
import com.phucanhduong.entity.general.NotificationType;
import com.phucanhduong.entity.order.Order;
import com.phucanhduong.exception.ResourceNotFoundException;
import com.phucanhduong.repository.general.NotificationRepository;
import com.phucanhduong.service.general.NotificationService;
import com.phucanhduong.service.order.OrderService;
import com.phucanhduong.utils.VNpayService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@RestController
@RequestMapping("/client-api/vnpay")
@AllArgsConstructor
public class ClientVNPay {

    private final VNpayService vnpayService;
    private final OrderService orderService;
    @GetMapping("/return")
    public RedirectView returnFromVNPay(HttpServletRequest request) {
        Map<String, String[]> paramMap = request.getParameterMap();
        var result = vnpayService.handleResult(paramMap);
        System.out.println("result = " + result);
        orderService.captureTransactionVNPay(result.getOrderId(), result.isSuccess());
        RedirectView redirectView = new RedirectView();
        if (result.isSuccess()) {
            System.out.println("Chuyen huong den trang thanh cong");
            redirectView.setUrl(AppConstants.FRONTEND_HOST + "/payment/success");
        }else
        {
            redirectView.setUrl(AppConstants.FRONTEND_HOST + "/payment/cancel");
        }

        return redirectView;

    }
}
