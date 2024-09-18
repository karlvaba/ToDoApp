using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

public class TodoDto
{
    [Required]
    public required string Description { get; set; }
}
