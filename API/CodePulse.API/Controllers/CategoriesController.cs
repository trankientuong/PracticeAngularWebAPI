using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Models.DTO;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Mvc;

namespace CodePulse.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoriesController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategoriesAsync() 
    {
        var categories = await _categoryRepository.GetAllAsync();

        // Map Domain model to DTO
        var response = new List<CategoryDto>();
        foreach (var category in categories) {
            response.Add(new CategoryDto 
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            });
        }

        return Ok(response);
    }

    [HttpGet("{id:Guid}")]
    public async Task<IActionResult> GetCategoryByIdAsync([FromRoute] Guid id) 
    {
        var existingCategory = await _categoryRepository.GetByIdAsync(id);
        if (existingCategory is null) 
        {
            return NotFound();
        }

        var response = new CategoryDto
        {
            Id = existingCategory.Id,
            Name = existingCategory.Name,
            UrlHandle = existingCategory.UrlHandle
        };
        return Ok(response);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategoryAsync(CreateCategoryRequestDto requestDto)
    {
        // Map DTO to Domain Model
        var category = new Category()
        {
            Name = requestDto.Name,
            UrlHandle = requestDto.UrlHandle
        };

        await _categoryRepository.CreateAsync(category);

        // Domain model to DTO
        var response = new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            UrlHandle = category.UrlHandle
        };

        return Ok(response);
    }

    [HttpPut("{id:Guid}")]
    public async Task<IActionResult> EditCategoryAsync([FromRoute] Guid id, UpdateCategoryRequestDto request) 
    {
        // Convert DTO to Domain Model
        var category = new Category
        {
            Id = id,
            Name = request.Name,
            UrlHandle = request.UrlHandle
        };

        category = await _categoryRepository.UpdateAsync(category);

        if (category == null) 
        {
            return NotFound();
        }

        // Convert Domain Model to DTO
        var response = new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            UrlHandle = category.UrlHandle
        };
        
        return Ok(response);
    }    

    [HttpDelete("{id:Guid}")]
    public async Task<IActionResult> DeleteCategoryAsync([FromRoute] Guid id)
    {
        var category = await _categoryRepository.DeleteAsync(id);
        if (category is null) 
        {
            return NotFound();
        }

        // Convert Domain Model to DTO
        var response = new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            UrlHandle = category.UrlHandle
        };

        return Ok(response);
    }
}