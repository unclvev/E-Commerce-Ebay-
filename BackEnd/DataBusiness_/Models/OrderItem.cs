﻿using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class OrderItem
    {
        public string Id { get; set; } = null!;
        public string? OrderId { get; set; }
        public string? ProductId { get; set; }
        public int? Quantity { get; set; }
        public decimal? Price { get; set; }

        public virtual Order? Order { get; set; }
        public virtual Product? Product { get; set; }
    }
}
