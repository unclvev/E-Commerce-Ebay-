using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class Store
    {
        public string Id { get; set; } = null!;
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
    }
}
