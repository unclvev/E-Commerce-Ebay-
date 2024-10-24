using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class UserOrder
    {
        public string? UserId { get; set; }
        public string? OrderId { get; set; }

        public virtual Order? Order { get; set; }
        public virtual User? User { get; set; }
    }
}
