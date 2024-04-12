package com.example.jhenaeumi.service.impl;

import com.example.jhenaeumi.dto.CategoryDto;
import com.example.jhenaeumi.entity.Category;
import com.example.jhenaeumi.repository.CategoryRepo;
import com.example.jhenaeumi.service.CategoryService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {


    private CategoryRepo categoryRepo;


    private ModelMapper modelMapper;
    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category category = modelMapper.map(categoryDto, Category.class);
        Category savedCategory = this.categoryRepo.save(category);

        return this.modelMapper.map(savedCategory, CategoryDto.class);

    }
}
