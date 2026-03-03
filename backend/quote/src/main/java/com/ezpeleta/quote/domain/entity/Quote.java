package com.ezpeleta.quote.domain.entity;

import com.ezpeleta.quote.application.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "quote")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Quote extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "author")
    private String author;

    @Column(name = "customer_name")
    private String customerName;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private QuoteStatusEnum status;

    @Column(name = "customer_email")
    private String customerEmail;

    @Column(name = "total_amount")
    private BigDecimal totalAmount;
}
