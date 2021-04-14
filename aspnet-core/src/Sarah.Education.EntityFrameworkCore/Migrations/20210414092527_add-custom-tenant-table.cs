using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sarah.Education.Migrations
{
    public partial class addcustomtenanttable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "ClassCentral");

            migrationBuilder.AddColumn<Guid>(
                name: "CustomTenantId",
                table: "Room",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CustomTenantId",
                table: "ClassCentral",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "CustomTenant",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomTenant", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Room_CustomTenantId",
                table: "Room",
                column: "CustomTenantId");

            migrationBuilder.CreateIndex(
                name: "IX_ClassCentral_CustomTenantId",
                table: "ClassCentral",
                column: "CustomTenantId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClassCentral_CustomTenant_CustomTenantId",
                table: "ClassCentral",
                column: "CustomTenantId",
                principalTable: "CustomTenant",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Room_CustomTenant_CustomTenantId",
                table: "Room",
                column: "CustomTenantId",
                principalTable: "CustomTenant",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClassCentral_CustomTenant_CustomTenantId",
                table: "ClassCentral");

            migrationBuilder.DropForeignKey(
                name: "FK_Room_CustomTenant_CustomTenantId",
                table: "Room");

            migrationBuilder.DropTable(
                name: "CustomTenant");

            migrationBuilder.DropIndex(
                name: "IX_Room_CustomTenantId",
                table: "Room");

            migrationBuilder.DropIndex(
                name: "IX_ClassCentral_CustomTenantId",
                table: "ClassCentral");

            migrationBuilder.DropColumn(
                name: "CustomTenantId",
                table: "Room");

            migrationBuilder.DropColumn(
                name: "CustomTenantId",
                table: "ClassCentral");

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "Room",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "ClassCentral",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
