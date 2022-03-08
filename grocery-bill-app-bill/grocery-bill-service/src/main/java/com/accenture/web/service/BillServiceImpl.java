package com.accenture.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accenture.web.domain.Bill;
import com.accenture.web.repository.BillRepository;

@Service
public class BillServiceImpl implements BillService{
	@Autowired
	private BillRepository billRepository;

	@Override
	public Bill saveBill(Bill bill) {
		return billRepository.save(bill);
	}

	@Override
	public List<Bill> getAllBills() {
		return billRepository.findAll();
	}

	
}
