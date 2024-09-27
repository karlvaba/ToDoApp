using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

public class TodoDto
{
    public int Id { get; set; }
    public required string Description { get; set; }
    public string? Deadline { get; set; }
    public bool Done { get; set; }
    public int SequenceNumber { get; set; }
}
