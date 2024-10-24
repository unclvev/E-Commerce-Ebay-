using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class Inventory
    {
        public Inventory()
        {
            StoreInventories = new HashSet<StoreInventory>();
        }

        public string Id { get; set; } = null!;
        public string? ProductId { get; set; }
        public int? Quantity { get; set; }
        public DateTime? Date { get; set; }
        public decimal? ImportPrice { get; set; }
        public decimal? ExportPrice { get; set; }
        public string? Brand { get; set; }
        public string? Characteristic { get; set; }

        public virtual Product? Product { get; set; }
        public virtual ICollection<StoreInventory> StoreInventories { get; set; }
    }
}
