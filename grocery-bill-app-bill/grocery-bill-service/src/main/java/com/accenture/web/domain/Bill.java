package com.accenture.web.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "GROCERY_BILL")
public class Bill {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TRANSACTION_ID")
	private Integer transactionId;
	
	@Column(name = "CLERK_ON_DUTY")
	private String clerkOnDuty;
	
	@Column(name = "REGULAR_PRICE")
	private double regularPrice;
	
	@Column(name = "DISCOUNTED_PRICE")
	private double discountedPrice;
	
	@Column(name = "TOTAL_PRICE")
	private double totalPrice;
	
	public Bill() {
		
	}

	public Integer getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(Integer transactionId) {
		this.transactionId = transactionId;
	}

	public String getClerkOnDuty() {
		return clerkOnDuty;
	}

	public void setClerkOnDuty(String clerkOnDuty) {
		this.clerkOnDuty = clerkOnDuty;
	}

	public double getRegularPrice() {
		return regularPrice;
	}

	public void setRegularPrice(double regularPrice) {
		this.regularPrice = regularPrice;
	}

	public double getDiscountedPrice() {
		return discountedPrice;
	}

	public void setDiscountedPrice(double discountedPrice) {
		this.discountedPrice = discountedPrice;
	}

	public double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
	
}
