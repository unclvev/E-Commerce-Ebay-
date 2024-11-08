using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DataBusiness_.Models
{
    public partial class EbayContext : DbContext
    {
        public EbayContext()
        {
        }

        public EbayContext(DbContextOptions<EbayContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bid> Bids { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<CategoryListing> CategoryListings { get; set; } = null!;
        public virtual DbSet<Color> Colors { get; set; } = null!;
        public virtual DbSet<Inventory> Inventories { get; set; } = null!;
        public virtual DbSet<Listing> Listings { get; set; } = null!;
        public virtual DbSet<ListingBid> ListingBids { get; set; } = null!;
        public virtual DbSet<Material> Materials { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderItem> OrderItems { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ProductImage> ProductImages { get; set; } = null!;
        public virtual DbSet<ProductListing> ProductListings { get; set; } = null!;
        public virtual DbSet<ProductReview> ProductReviews { get; set; } = null!;
        public virtual DbSet<ProductVariation> ProductVariations { get; set; } = null!;
        public virtual DbSet<Promotion> Promotions { get; set; } = null!;
        public virtual DbSet<Review> Reviews { get; set; } = null!;
        public virtual DbSet<Size> Sizes { get; set; } = null!;
        public virtual DbSet<Store> Stores { get; set; } = null!;
        public virtual DbSet<StoreInventory> StoreInventories { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserBid> UserBids { get; set; } = null!;
        public virtual DbSet<UserListing> UserListings { get; set; } = null!;
        public virtual DbSet<UserOrder> UserOrders { get; set; } = null!;
        public virtual DbSet<UserReview> UserReviews { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var builder = new ConfigurationBuilder()
                               .SetBasePath(Directory.GetCurrentDirectory())
                               .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            IConfigurationRoot configuration = builder.Build();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("MyCnn"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bid>(entity =>
            {
                entity.ToTable("Bid");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.BidAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.BidTime).HasColumnType("datetime");

                entity.Property(e => e.ListingId).HasMaxLength(50);

                entity.Property(e => e.UserId).HasMaxLength(50);

                entity.HasOne(d => d.Listing)
                    .WithMany(p => p.Bids)
                    .HasForeignKey(d => d.ListingId)
                    .HasConstraintName("FK__Bid__ListingId__6A30C649");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Bids)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Bid__UserId__6B24EA82");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<CategoryListing>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("CategoryListing");

                entity.Property(e => e.CategoryId).HasMaxLength(50);

                entity.Property(e => e.ListingId).HasMaxLength(50);

                entity.HasOne(d => d.Category)
                    .WithMany()
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__CategoryL__Categ__08B54D69");

                entity.HasOne(d => d.Listing)
                    .WithMany()
                    .HasForeignKey(d => d.ListingId)
                    .HasConstraintName("FK__CategoryL__Listi__09A971A2");
            });

            modelBuilder.Entity<Color>(entity =>
            {
                entity.ToTable("Color");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Inventory>(entity =>
            {
                entity.ToTable("Inventory");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Brand).HasMaxLength(255);

                entity.Property(e => e.Characteristic).HasMaxLength(255);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ExportPrice).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ImportPrice).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Inventories)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Inventory__Produ__7C4F7684");
            });

            modelBuilder.Entity<Listing>(entity =>
            {
                entity.ToTable("Listing");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.CategoryId).HasMaxLength(50);

                entity.Property(e => e.CurrentPrice).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.EndTime).HasColumnType("datetime");

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.Property(e => e.SellerId).HasMaxLength(50);

                entity.Property(e => e.StartPrice).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.StartTime).HasColumnType("datetime");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Listings)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__Listing__Categor__5CD6CB2B");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Listings)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Listing__Product__5AEE82B9");

                entity.HasOne(d => d.Seller)
                    .WithMany(p => p.Listings)
                    .HasForeignKey(d => d.SellerId)
                    .HasConstraintName("FK__Listing__SellerI__5BE2A6F2");
            });

            modelBuilder.Entity<ListingBid>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("ListingBid");

                entity.Property(e => e.BidId).HasMaxLength(50);

                entity.Property(e => e.ListingId).HasMaxLength(50);

                entity.HasOne(d => d.Bid)
                    .WithMany()
                    .HasForeignKey(d => d.BidId)
                    .HasConstraintName("FK__ListingBi__BidId__6E01572D");

                entity.HasOne(d => d.Listing)
                    .WithMany()
                    .HasForeignKey(d => d.ListingId)
                    .HasConstraintName("FK__ListingBi__Listi__6D0D32F4");
            });

            modelBuilder.Entity<Material>(entity =>
            {
                entity.ToTable("Material");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Order");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.OrderDate).HasColumnType("datetime");

                entity.Property(e => e.ShippingAddress).HasMaxLength(255);

                entity.Property(e => e.TotalAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.UserId).HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Order__UserId__5FB337D6");
            });

            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.ToTable("OrderItem");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.OrderId).HasMaxLength(50);

                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK__OrderItem__Order__628FA481");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__OrderItem__Produ__6383C8BA");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.OriginalPrice).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.SaleEndDate).HasColumnType("datetime");

                entity.Property(e => e.SaleStartDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<ProductImage>(entity =>
            {
                entity.ToTable("ProductImage");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.ImageUrl).HasMaxLength(255);

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductImages)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__ProductIm__Produ__5812160E");
            });

            modelBuilder.Entity<ProductListing>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("ProductListing");

                entity.Property(e => e.ListingId).HasMaxLength(50);

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.HasOne(d => d.Listing)
                    .WithMany()
                    .HasForeignKey(d => d.ListingId)
                    .HasConstraintName("FK__ProductLi__Listi__06CD04F7");

                entity.HasOne(d => d.Product)
                    .WithMany()
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__ProductLi__Produ__05D8E0BE");
            });

            modelBuilder.Entity<ProductReview>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("ProductReview");

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.Property(e => e.ReviewId).HasMaxLength(50);

                entity.HasOne(d => d.Product)
                    .WithMany()
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__ProductRe__Produ__0B91BA14");

                entity.HasOne(d => d.Review)
                    .WithMany()
                    .HasForeignKey(d => d.ReviewId)
                    .HasConstraintName("FK__ProductRe__Revie__0C85DE4D");
            });

            modelBuilder.Entity<ProductVariation>(entity =>
            {
                entity.ToTable("ProductVariation");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductVariations)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__ProductVa__Produ__5535A963");
            });

            modelBuilder.Entity<Promotion>(entity =>
            {
                entity.ToTable("Promotion");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.PrDescription).HasMaxLength(250);

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Promotions)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Promotion__Produ__03F0984C");
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.ToTable("Review");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Comment).HasMaxLength(255);

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.Property(e => e.Rating).HasColumnType("decimal(3, 2)");

                entity.Property(e => e.ReviewDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasMaxLength(50);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Review__ProductI__66603565");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Review__UserId__6754599E");
            });

            modelBuilder.Entity<Size>(entity =>
            {
                entity.ToTable("Size");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.ToTable("Store");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            });

            modelBuilder.Entity<StoreInventory>(entity =>
            {
                entity.ToTable("StoreInventory");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.InventoryId).HasMaxLength(50);

                entity.HasOne(d => d.Inventory)
                    .WithMany(p => p.StoreInventories)
                    .HasForeignKey(d => d.InventoryId)
                    .HasConstraintName("FK__StoreInve__Inven__01142BA1");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.FirstName).HasMaxLength(255);

                entity.Property(e => e.LastName).HasMaxLength(255);

                entity.Property(e => e.Password).HasMaxLength(255);

                entity.Property(e => e.PhoneNumber).HasMaxLength(50);

                entity.Property(e => e.RefreshToken).HasMaxLength(100);

                entity.Property(e => e.RefreshTokenCreate).HasColumnType("datetime");

                entity.Property(e => e.RefreshTokenExpiryTime).HasColumnType("datetime");

                entity.Property(e => e.Roles).HasMaxLength(10);

                entity.Property(e => e.Username).HasMaxLength(255);
            });

            modelBuilder.Entity<UserBid>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("UserBid");

                entity.Property(e => e.BidId).HasMaxLength(50);

                entity.Property(e => e.UserId).HasMaxLength(50);

                entity.HasOne(d => d.Bid)
                    .WithMany()
                    .HasForeignKey(d => d.BidId)
                    .HasConstraintName("FK__UserBid__BidId__797309D9");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__UserBid__UserId__787EE5A0");
            });

            modelBuilder.Entity<UserListing>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("UserListing");

                entity.Property(e => e.ListingId).HasMaxLength(50);

                entity.Property(e => e.UserId).HasMaxLength(50);

                entity.HasOne(d => d.Listing)
                    .WithMany()
                    .HasForeignKey(d => d.ListingId)
                    .HasConstraintName("FK__UserListi__Listi__70DDC3D8");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__UserListi__UserI__6FE99F9F");
            });

            modelBuilder.Entity<UserOrder>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("UserOrder");

                entity.Property(e => e.OrderId).HasMaxLength(50);

                entity.Property(e => e.UserId).HasMaxLength(50);

                entity.HasOne(d => d.Order)
                    .WithMany()
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK__UserOrder__Order__73BA3083");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__UserOrder__UserI__72C60C4A");
            });

            modelBuilder.Entity<UserReview>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("UserReview");

                entity.Property(e => e.ReviewId).HasMaxLength(50);

                entity.Property(e => e.UserId).HasMaxLength(50);

                entity.HasOne(d => d.Review)
                    .WithMany()
                    .HasForeignKey(d => d.ReviewId)
                    .HasConstraintName("FK__UserRevie__Revie__76969D2E");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__UserRevie__UserI__75A278F5");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
