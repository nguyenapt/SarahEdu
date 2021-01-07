using Microsoft.EntityFrameworkCore.Migrations;

namespace Sarah.Education.Migrations
{
    public partial class adduseridtoteacher : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "UserId",
                table: "Teacher",
                type: "bigint",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Teacher");
        }
    }
}
