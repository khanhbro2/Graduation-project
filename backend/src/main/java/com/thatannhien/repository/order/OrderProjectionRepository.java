package com.thatannhien.repository.order;

import com.thatannhien.dto.statistic.StatisticResource;
import com.thatannhien.entity.order.Order;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Repository
@AllArgsConstructor
public class OrderProjectionRepository {

    private EntityManager em;

    public List<StatisticResource> getOrderCountByCreateDate() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<StatisticResource> query = cb.createQuery(StatisticResource.class);

        Root<Order> order = query.from(Order.class);
        query.select(cb.construct(StatisticResource.class, order.get("createdAt").as(Instant.class), cb.count(order.get("id"))));
        query.groupBy(order.get("createdAt").as(Instant.class));
        query.orderBy(cb.asc(order.get("createdAt")));

        return em.createQuery(query).getResultList();
    }

    /**
     * Tính doanh thu theo ngày từ các đơn hàng đã giao thành công (status = 4) và đã thanh toán (paymentStatus = 2)
     */
    public List<StatisticResource> getRevenueByCreateDate() {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = cb.createQuery(Object[].class);

        Root<Order> order = query.from(Order.class);
        
        // Lọc đơn hàng đã giao thành công và đã thanh toán
        Predicate statusPredicate = cb.equal(order.get("status"), 4);
        Predicate paymentStatusPredicate = cb.equal(order.get("paymentStatus"), 2);
        Predicate wherePredicate = cb.and(statusPredicate, paymentStatusPredicate);
        
        // Tính tổng doanh thu (totalPay)
        query.select(cb.array(
            order.get("createdAt").as(Instant.class),
            cb.sum(order.get("totalPay"))
        ));
        query.where(wherePredicate);
        query.groupBy(order.get("createdAt").as(Instant.class));
        query.orderBy(cb.asc(order.get("createdAt")));

        // Map kết quả từ Object[] sang StatisticResource
        List<Object[]> results = em.createQuery(query).getResultList();
        return results.stream()
            .map(row -> {
                Instant date = (Instant) row[0];
                BigDecimal totalPay = (BigDecimal) row[1];
                return new StatisticResource(date, totalPay.longValue());
            })
            .collect(java.util.stream.Collectors.toList());
    }

}
