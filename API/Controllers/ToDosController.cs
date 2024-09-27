using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.Json;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ToDosController(DataContext context, IMapper mapper) : ControllerBase
{
    [HttpGet("health")]
    public ActionResult<string> Health() {
        return Ok("API reached");
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoDto>>> GetToDos() 
    {
        var toDos = await context.ToDos.OrderBy(x => x.SequenceNumber).ToListAsync();

        var toDosReturned = mapper.Map<IEnumerable<TodoDto>>(toDos);

        return Ok(toDosReturned);
    
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TodoDto>> GetToDoItem(int id) 
    {
        var toDoItem = await context.ToDos.FindAsync(id);

        if (toDoItem == null) return NotFound();

        return mapper.Map<TodoDto>(toDoItem);
    }

    [HttpPost("new")]
    public async Task<ActionResult<TodoDto>> Add(TodoDto todoDto) 
    {

        var toDoItem = mapper.Map<TodoItem>(todoDto);
        toDoItem.CreatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");
        toDoItem.UpdatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");
        toDoItem.SequenceNumber = context.ToDos.Count();

        context.ToDos.Add(toDoItem);
        await context.SaveChangesAsync();

        return todoDto;
    }
    [HttpPost("update")]
    public async Task<ActionResult<IEnumerable<TodoDto>>> Update(TodoDto[] todoDtos) 
    {
        var todos = await context.ToDos.Where(entity => 
            todoDtos.Select(dto => dto.Id).Contains(entity.Id)).
            ToListAsync();

        foreach (var todo in todos)
        {
            var dto = Array.Find(todoDtos, item => item.Id == todo.Id);

            if (dto == null) {
                return NotFound();
            }

            todo.Description = dto.Description;
            todo.Deadline = dto.Deadline;
            todo.Done = dto.Done;
            todo.SequenceNumber = dto.SequenceNumber;
        }

        await context.SaveChangesAsync();

        return Ok(todoDtos);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<TodoItem>> Delete(int id) 
    {
        var toDoItem = await context.ToDos.FindAsync(id);

        if (toDoItem == null) return NotFound();

        var itemsToReoder = await context.ToDos.Where(x => x.SequenceNumber > toDoItem.SequenceNumber).ToListAsync();
        context.ToDos.Remove(toDoItem);
        foreach (var item in itemsToReoder) {
            item.SequenceNumber -= 1;
        }
        await context.SaveChangesAsync();

        return toDoItem;
    }


}
