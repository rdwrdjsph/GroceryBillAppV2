package com.accenture.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accenture.web.domain.Bill;
import com.accenture.web.service.BillService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("bill")
public class GroceryBillContoller {
	@Autowired
	private BillService billService;
	
	@PostMapping("/add")
	public String add(@RequestBody Bill bill) {
		billService.saveBill(bill);
		return "New Transaction is Added";
	}
	
	@GetMapping("/view")
	public List<Bill> getAllBills() {
		return billService.getAllBills();
	}

}
