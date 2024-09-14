using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
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
}
