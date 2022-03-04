package com.accenture.web.service;

import java.util.List;

import com.accenture.web.domain.Item;

public interface ItemService {
	public Item saveItem(Item item);
	public List<Item> getAllItems();
	public Item getItemById(Integer itemId);
	public void deleteItemById(Integer itemId);
}
