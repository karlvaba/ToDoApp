using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ToDoItem
    {
        public int Id { get; set; }
        public required string Description { get; set; }
    }
}