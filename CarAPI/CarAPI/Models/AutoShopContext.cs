using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CarAPI.Models;

public partial class AutoShopContext : DbContext
{
    public AutoShopContext()
    {
    }

    public AutoShopContext(DbContextOptions<AutoShopContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Auto> Autos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=KOMPUTER\\SQLEXPRESS;Database=AutoShop;Trusted_Connection=True;Encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Auto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Autos__3213E83F3A4AC6EA");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(150)
                .HasColumnName("image_url");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
