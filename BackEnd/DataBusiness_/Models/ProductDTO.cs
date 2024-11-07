namespace DataBusiness_.Models
{
    public class CategoryDTO
    {
        public string? CategoryName { get; set; }
        public virtual ICollection<ProductDTO> products { get; set; }

    }
    public class ProductDTO
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? OriginalPrice { get; set; }
        public string? ImageUrl { get; set; }

    }
}
