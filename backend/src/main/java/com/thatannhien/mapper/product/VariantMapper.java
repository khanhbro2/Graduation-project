package com.thatannhien.mapper.product;

import com.thatannhien.dto.product.VariantRequest;
import com.thatannhien.dto.product.VariantResponse;
import com.thatannhien.entity.product.Variant;
import com.thatannhien.mapper.GenericMapper;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface VariantMapper extends GenericMapper<Variant, VariantRequest, VariantResponse> {
}
