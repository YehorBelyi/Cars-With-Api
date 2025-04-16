using System;
using System.Collections.Generic;

namespace CarAPI.Models;

public partial class Auto
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int Quantity { get; set; }

    public string ImageUrl { get; set; } = null!;
}
