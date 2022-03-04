package com.accenture.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.accenture.web.domain.Item;
import com.accenture.web.repository.ItemRepository;

@Service
public class ItemServiceImpl implements ItemService {
	@Autowired
	private ItemRepository itemRepository;

	@Override
	public Item saveItem(Item item) {
		return itemRepository.save(item);
	}

	@Override
	public List<Item> getAllItems() {
		return itemRepository.findAll();
	}

	@Override
	public Item getItemById(Integer itemId) {
		return itemRepository.findById(itemId).get();
	}

	@Override
	public void deleteItemById(Integer itemId) {
		itemRepository.deleteById(itemId);
	}
	
}
