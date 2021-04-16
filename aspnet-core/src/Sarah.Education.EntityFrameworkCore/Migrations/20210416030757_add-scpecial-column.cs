using Microsoft.EntityFrameworkCore.Migrations;

namespace Sarah.Education.Migrations
{
    public partial class addscpecialcolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsSpecialRoom",
                table: "Room",
                type: "bit",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsSpecialRoom",
                table: "Room");
        }
    }
}
