package com.accenture.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accenture.web.domain.Item;
import com.accenture.web.service.ItemService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/item")
public class ItemController {
	@Autowired
	private ItemService itemService;
	
	@PostMapping("/add")
	public String add(@RequestBody Item item) {
		itemService.saveItem(item);
		return "New Item is Added";
	}
	
	@GetMapping("/view")
	public List<Item> getAllItems() {
		return itemService.getAllItems();
	}
	
	@GetMapping("/view/{itemId}")
	public ResponseEntity<Item> getItemById(@PathVariable Integer itemId) {
		Item existingItem = itemService.getItemById(itemId);
		return ResponseEntity.ok(existingItem);
	}

	@PutMapping("/update/{itemId}")
	public ResponseEntity<Item> updateItem(@RequestBody Item item,@PathVariable Integer itemId) {
		Item existingItem = itemService.getItemById(itemId);
		itemService.saveItem(item);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{itemId}")
	public String delete(@PathVariable Integer itemId) {
		itemService.deleteItemById(itemId);
		return "Deleted Item with Id: "+ itemId;
	}
}
