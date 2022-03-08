package com.accenture.web.service;

import java.util.List;

import com.accenture.web.domain.Bill;

public interface BillService {
	public Bill saveBill(Bill bill);
	public List<Bill> getAllBills();
}
