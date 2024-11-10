namespace DataBusiness_.Models
{
    public class CategoryDTO
    {
        public string? CategoryName { get; set; }
        public virtual ICollection<ProductDTO> products { get; set; }
        public virtual ICollection<string> availableSizes { get; set; } 
        public virtual ICollection<string> availableColors { get; set; }
        public virtual ICollection<string> availableStores { get; set; }

    }
    public class ProductDTO
    {
        public string Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? OriginalPrice { get; set; }
        public string? ImageUrl { get; set; }
        public virtual ICollection<ColorDTO> colors { get; set; }
        public virtual ICollection<SizeDTO> sizes { get; set; }
        public virtual ICollection<StoreDTO> stores { get; set; }


    }
    public class ColorDTO
    {
        public string? ColorName { get; set; }
    }
    public class SizeDTO
    {
        public string? SizeName { get; set; }

    }
    public class StoreDTO
    {
        public string? StoreName { get; set; }
    }
}
