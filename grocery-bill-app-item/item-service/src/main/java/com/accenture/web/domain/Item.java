package com.accenture.web.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="ITEMS")
public class Item {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ITEM_ID")
	private int itemId;
	@Column(name="NAME")
	private String name;
	@Column(name="PRICE")
	private double price;
	@Column(name="DISCOUNTED_PRICE")
	private double discountedPrice;
	@Column(name="IS_DISCOUNTED")
	private boolean isDiscounted;
	@Column(name="DISCOUNT_PERCENTAGE")
	private double discountPercentage;
	
	public Item() {
		
	}
	
	@Override
	public String toString() {
		return "Item [itemId=" + itemId + ", name=" + name + ", price=" + price + ", discountedPrice=" + discountedPrice
				+ ", isDiscounted=" + isDiscounted + ", discountPercentage=" + discountPercentage + "]";
	}

	public Item(int itemId, String name, double price, double discountedPrice, boolean isDiscounted,
			double discountPercentage) {
		super();
		this.itemId = itemId;
		this.name = name;
		this.price = price;
		this.discountedPrice = discountedPrice;
		this.isDiscounted = isDiscounted;
		this.discountPercentage = discountPercentage;
	}

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getDiscountedPrice() {
		return discountedPrice;
	}

	public void setDiscountedPrice(double discountedPrice) {
		this.discountedPrice = discountedPrice;
	}

	public boolean getIsDiscounted() {
		return isDiscounted;
	}

	public void setDiscounted(boolean isDiscounted) {
		this.isDiscounted = isDiscounted;
	}

	public double getDiscountPercentage() {
		return discountPercentage;
	}

	public void setDiscountPercentage(double discountPercentage) {
		this.discountPercentage = discountPercentage;
	}
	
}
