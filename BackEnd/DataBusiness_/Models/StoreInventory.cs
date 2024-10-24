using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class StoreInventory
    {
        public string Id { get; set; } = null!;
        public string? InventoryId { get; set; }

        public virtual Inventory? Inventory { get; set; }
    }
}
