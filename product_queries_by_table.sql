-- ============================================
-- CÁC CÂU SQL XEM CHI TIẾT SẢN PHẨM THEO TỪNG BẢNG
-- ============================================

-- 1. XEM THÔNG TIN SẢN PHẨM CHÍNH + CÁC BẢNG THAM CHIẾU
SELECT 
    p.*,
    c.name AS category_name,
    c.slug AS category_slug,
    b.name AS brand_name,
    s.name AS supplier_name,
    u.name AS unit_name,
    g.name AS guarantee_name,
    g.month AS guarantee_month
FROM phucanhduong.product p
LEFT JOIN phucanhduong.category c ON p.category_id = c.id
LEFT JOIN phucanhduong.brand b ON p.brand_id = b.id
LEFT JOIN phucanhduong.supplier s ON p.supplier_id = s.id
LEFT JOIN phucanhduong.unit u ON p.unit_id = u.id
LEFT JOIN phucanhduong.guarantee g ON p.guarantee_id = g.id
ORDER BY p.id;

-- 2. XEM BIẾN THỂ (VARIANT) CỦA SẢN PHẨM
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.code AS product_code,
    v.*
FROM phucanhduong.product p
LEFT JOIN phucanhduong.variant v ON p.id = v.product_id
ORDER BY p.id, v.id;

-- 3. XEM ẢNH SẢN PHẨM
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.code AS product_code,
    i.*
FROM phucanhduong.product p
LEFT JOIN phucanhduong.image i ON p.id = i.product_id
ORDER BY p.id, i.id;

-- 4. XEM TAG CỦA SẢN PHẨM
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.code AS product_code,
    pt.*,
    t.name AS tag_name
FROM phucanhduong.product p
LEFT JOIN phucanhduong.product_tag pt ON p.id = pt.product_id
LEFT JOIN phucanhduong.tag t ON pt.tag_id = t.id
ORDER BY p.id, t.id;

-- 5. XEM KHUYẾN MÃI CỦA SẢN PHẨM
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.code AS product_code,
    pp.*,
    pr.name AS promotion_name,
    pr.percent AS promotion_percent,
    pr.start_date,
    pr.end_date
FROM phucanhduong.product p
LEFT JOIN phucanhduong.promotion_product pp ON p.id = pp.product_id
LEFT JOIN phucanhduong.promotion pr ON pp.promotion_id = pr.id
ORDER BY p.id, pr.id;

-- 6. XEM ĐÁNH GIÁ (REVIEW) CỦA SẢN PHẨM
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.code AS product_code,
    r.*,
    u.username AS reviewer_username
FROM phucanhduong.product p
LEFT JOIN phucanhduong.review r ON p.id = r.product_id
LEFT JOIN phucanhduong.user u ON r.user_id = u.id
ORDER BY p.id, r.id;

-- 7. XEM GIỚI HẠN TỒN KHO SẢN PHẨM
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.code AS product_code,
    pil.*
FROM phucanhduong.product p
LEFT JOIN phucanhduong.product_inventory_limit pil ON p.id = pil.product_id
ORDER BY p.id;

-- 8. XEM GIỚI HẠN TỒN KHO VARIANT
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.code AS product_code,
    v.id AS variant_id,
    v.sku AS variant_sku,
    vil.*
FROM phucanhduong.product p
LEFT JOIN phucanhduong.variant v ON p.id = v.product_id
LEFT JOIN phucanhduong.variant_inventory_limit vil ON v.id = vil.variant_id
ORDER BY p.id, v.id;

-- 9. XEM ĐẶT TRƯỚC (PREORDER) CỦA SẢN PHẨM
SELECT 
    p.id AS product_id,
    p.name AS product_name,
    p.code AS product_code,
    pre.*,
    u.username AS user_username
FROM phucanhduong.product p
LEFT JOIN phucanhduong.preorder pre ON p.id = pre.product_id
LEFT JOIN phucanhduong.user u ON pre.user_id = u.id
ORDER BY p.id, pre.id;

-- 10. XEM TẤT CẢ THÔNG TIN CỦA 1 SẢN PHẨM CỤ THỂ (thay ? bằng product_id)
SELECT 
    p.*,
    c.name AS category_name,
    b.name AS brand_name,
    s.name AS supplier_name,
    u.name AS unit_name,
    g.name AS guarantee_name
FROM phucanhduong.product p
LEFT JOIN phucanhduong.category c ON p.category_id = c.id
LEFT JOIN phucanhduong.brand b ON p.brand_id = b.id
LEFT JOIN phucanhduong.supplier s ON p.supplier_id = s.id
LEFT JOIN phucanhduong.unit u ON p.unit_id = u.id
LEFT JOIN phucanhduong.guarantee g ON p.guarantee_id = g.id
WHERE p.id = ?;  -- Thay ? bằng ID sản phẩm muốn xem


