namespace SellerService.DTO
{
    public class OrderResponseDTO
    {
        public string Id { get; set; } = null!;
        public string? UserId { get; set; }
        public DateTime? OrderDate { get; set; }
        public string? ShippingAddress { get; set; }
        public decimal? TotalAmount { get; set; }
    }
}
