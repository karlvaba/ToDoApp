using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ToDosController(DataContext context) : ControllerBase
{

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ToDoItem>>> GetToDos() 
    {
        var toDos = await context.ToDos.ToListAsync();

        return toDos;
    
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ToDoItem>> GetToDoItem(int id) 
    {
        var toDoItem = await context.ToDos.FindAsync(id);

        if (toDoItem == null) return NotFound();

        return toDoItem;
    }
    [HttpPost]
    public async Task<ActionResult<ToDoItem>> Add(TodoDto todoDto) 
    {

        var toDoItem = new ToDoItem {
            Description = todoDto.Description,
            Deadline = todoDto.Deadline,
            Done = todoDto.Done,
            CreatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ"),
            UpdatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ")
        };

        context.ToDos.Add(toDoItem);
        await context.SaveChangesAsync();

        return toDoItem;
    }
    [HttpPost("{id:int}")]
    public async Task<ActionResult<ToDoItem>> Update(int id, TodoDto todoDto) 
    {
        //todo: input validation
        var toDoItem = await context.ToDos.FindAsync(id);

        if (toDoItem == null) return NotFound();

        toDoItem.Description = todoDto.Description;
        toDoItem.Deadline = todoDto.Deadline;
        toDoItem.Done = todoDto.Done;
        toDoItem.UpdatedAt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ssZ");


        context.ToDos.Update(toDoItem);
        await context.SaveChangesAsync();

        return toDoItem;
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<ToDoItem>> Delete(int id) 
    {
        var toDoItem = await context.ToDos.FindAsync(id);

        if (toDoItem == null) return NotFound();

       
        context.ToDos.Remove(toDoItem);
        await context.SaveChangesAsync();

        return toDoItem;
    }


}
