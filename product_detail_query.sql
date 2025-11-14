-- Câu SQL để xem chi tiết sản phẩm với tất cả các bảng liên quan
SELECT 
    -- Thông tin sản phẩm chính
    p.id AS product_id,
    p.name AS product_name,
    p.code AS product_code,
    p.slug AS product_slug,
    p.short_description,
    p.description,
    p.status AS product_status,
    p.weight AS product_weight,
    p.specifications AS product_specifications,
    p.properties AS product_properties,
    p.created_at AS product_created_at,
    p.updated_at AS product_updated_at,
    
    -- Thông tin danh mục
    c.id AS category_id,
    c.name AS category_name,
    c.slug AS category_slug,
    
    -- Thông tin thương hiệu
    b.id AS brand_id,
    b.name AS brand_name,
    
    -- Thông tin nhà cung cấp
    s.id AS supplier_id,
    s.name AS supplier_name,
    
    -- Thông tin đơn vị tính
    u.id AS unit_id,
    u.name AS unit_name,
    
    -- Thông tin bảo hành
    g.id AS guarantee_id,
    g.name AS guarantee_name,
    g.month AS guarantee_month,
    
    -- Thông tin variant (biến thể)
    v.id AS variant_id,
    v.sku AS variant_sku,
    v.cost AS variant_cost,
    v.price AS variant_price,
    v.properties AS variant_properties,
    v.status AS variant_status,
    
    -- Thông tin ảnh sản phẩm
    i.id AS image_id,
    i.path AS image_path,
    i.is_thumbnail AS image_is_thumbnail,
    
    -- Thông tin tag
    t.id AS tag_id,
    t.name AS tag_name,
    
    -- Thông tin khuyến mãi
    pr.id AS promotion_id,
    pr.name AS promotion_name,
    pr.percent AS promotion_percent,
    pr.start_date AS promotion_start_date,
    pr.end_date AS promotion_end_date,
    
    -- Thông tin đánh giá
    r.id AS review_id,
    r.rating AS review_rating,
    r.comment AS review_comment,
    r.created_at AS review_created_at,
    
    -- Thông tin giới hạn tồn kho sản phẩm
    pil.minimum AS product_min_inventory,
    pil.maximum AS product_max_inventory,
    
    -- Thông tin giới hạn tồn kho variant
    vil.minimum AS variant_min_inventory,
    vil.maximum AS variant_max_inventory

FROM phucanhduong.product p

-- JOIN các bảng tham chiếu
LEFT JOIN phucanhduong.category c ON p.category_id = c.id
LEFT JOIN phucanhduong.brand b ON p.brand_id = b.id
LEFT JOIN phucanhduong.supplier s ON p.supplier_id = s.id
LEFT JOIN phucanhduong.unit u ON p.unit_id = u.id
LEFT JOIN phucanhduong.guarantee g ON p.guarantee_id = g.id

-- JOIN variant (biến thể sản phẩm)
LEFT JOIN phucanhduong.variant v ON p.id = v.product_id

-- JOIN ảnh sản phẩm
LEFT JOIN phucanhduong.image i ON p.id = i.product_id

-- JOIN tag sản phẩm
LEFT JOIN phucanhduong.product_tag pt ON p.id = pt.product_id
LEFT JOIN phucanhduong.tag t ON pt.tag_id = t.id

-- JOIN khuyến mãi
LEFT JOIN phucanhduong.promotion_product pp ON p.id = pp.product_id
LEFT JOIN phucanhduong.promotion pr ON pp.promotion_id = pr.id

-- JOIN đánh giá
LEFT JOIN phucanhduong.review r ON p.id = r.product_id

-- JOIN giới hạn tồn kho sản phẩm
LEFT JOIN phucanhduong.product_inventory_limit pil ON p.id = pil.product_id

-- JOIN giới hạn tồn kho variant
LEFT JOIN phucanhduong.variant_inventory_limit vil ON v.id = vil.variant_id

ORDER BY p.id, v.id, i.id, t.id, pr.id, r.id;


