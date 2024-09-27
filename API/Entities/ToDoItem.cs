using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class TodoItem
    {
        public int Id { get; set; }
        public required string Description { get; set; }
        public string? Deadline {get; set; }
        public bool Done { get; set; }
        public required int SequenceNumber { get; set; }
        public required string CreatedAt {get; set; }
        public required string UpdatedAt {get; set; } 
    }
}