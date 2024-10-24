using System;
using System.Collections.Generic;

namespace DataBusiness_.Models
{
    public partial class Product
    {
        public Product()
        {
            Inventories = new HashSet<Inventory>();
            Listings = new HashSet<Listing>();
            OrderItems = new HashSet<OrderItem>();
            ProductImages = new HashSet<ProductImage>();
            ProductVariations = new HashSet<ProductVariation>();
            Reviews = new HashSet<Review>();
        }

        public string Id { get; set; } = null!;
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? OriginalPrice { get; set; }
        public DateTime? SaleStartDate { get; set; }
        public DateTime? SaleEndDate { get; set; }
        public int? StockQuantity { get; set; }

        public virtual ICollection<Inventory> Inventories { get; set; }
        public virtual ICollection<Listing> Listings { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; }
        public virtual ICollection<ProductImage> ProductImages { get; set; }
        public virtual ICollection<ProductVariation> ProductVariations { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
    }
}
