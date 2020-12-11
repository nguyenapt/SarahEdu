using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SarahEducation.Migrations
{
    public partial class updatetable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProtectorStudents_Protector_ProtectorId",
                table: "ProtectorStudents");

            migrationBuilder.DropForeignKey(
                name: "FK_ProtectorStudents_Student_StudentId",
                table: "ProtectorStudents");

            migrationBuilder.DropTable(
                name: "SubjectFees");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProtectorStudents",
                table: "ProtectorStudents");

            migrationBuilder.RenameTable(
                name: "ProtectorStudents",
                newName: "ProtectorStudent");

            migrationBuilder.RenameIndex(
                name: "IX_ProtectorStudents_StudentId",
                table: "ProtectorStudent",
                newName: "IX_ProtectorStudent_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_ProtectorStudents_ProtectorId",
                table: "ProtectorStudent",
                newName: "IX_ProtectorStudent_ProtectorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProtectorStudent",
                table: "ProtectorStudent",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ClassCentral",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassCentral", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CourseFee",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Fee = table.Column<double>(nullable: false),
                    CourseId = table.Column<Guid>(nullable: false),
                    Year = table.Column<int>(nullable: true),
                    IsActive = table.Column<bool>(nullable: true),
                    IsSingle = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseFee", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseFee_Course_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Course",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseSubject",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    CourseId = table.Column<Guid>(nullable: false),
                    SubjectId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseSubject", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseSubject_Course_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Course",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseSubject_Subject_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClassStudent",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    StudentId = table.Column<Guid>(nullable: false),
                    ClassCentralId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassStudent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClassStudent_ClassCentral_ClassCentralId",
                        column: x => x.ClassCentralId,
                        principalTable: "ClassCentral",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClassStudent_Student_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Student",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudentCourseSubject",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    StudentId = table.Column<Guid>(nullable: false),
                    CourseSubjectId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentCourseSubject", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentCourseSubject_CourseSubject_CourseSubjectId",
                        column: x => x.CourseSubjectId,
                        principalTable: "CourseSubject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentCourseSubject_Student_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Student",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TimeSheetEntry",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    FromDate = table.Column<DateTime>(nullable: false),
                    ToDate = table.Column<DateTime>(nullable: false),
                    RoomId = table.Column<Guid>(nullable: false),
                    TeacherId = table.Column<Guid>(nullable: false),
                    CourseSubjectId = table.Column<Guid>(nullable: false),
                    Fee = table.Column<double>(nullable: false),
                    Status = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeSheetEntry", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeSheetEntry_CourseSubject_CourseSubjectId",
                        column: x => x.CourseSubjectId,
                        principalTable: "CourseSubject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TimeSheetEntry_Room_RoomId",
                        column: x => x.RoomId,
                        principalTable: "Room",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TimeSheetEntry_Teacher_TeacherId",
                        column: x => x.TeacherId,
                        principalTable: "Teacher",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TimeSheetEntryStudent",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    StudentId = table.Column<Guid>(nullable: false),
                    TimeSheetEntryId = table.Column<Guid>(nullable: false),
                    Attitude = table.Column<string>(nullable: true),
                    ReceptiveAbility = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TimeSheetEntryStudent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TimeSheetEntryStudent_Student_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Student",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TimeSheetEntryStudent_TimeSheetEntry_TimeSheetEntryId",
                        column: x => x.TimeSheetEntryId,
                        principalTable: "TimeSheetEntry",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClassStudent_ClassCentralId",
                table: "ClassStudent",
                column: "ClassCentralId");

            migrationBuilder.CreateIndex(
                name: "IX_ClassStudent_StudentId",
                table: "ClassStudent",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseFee_CourseId",
                table: "CourseFee",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseSubject_CourseId",
                table: "CourseSubject",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseSubject_SubjectId",
                table: "CourseSubject",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentCourseSubject_CourseSubjectId",
                table: "StudentCourseSubject",
                column: "CourseSubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentCourseSubject_StudentId",
                table: "StudentCourseSubject",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeSheetEntry_CourseSubjectId",
                table: "TimeSheetEntry",
                column: "CourseSubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeSheetEntry_RoomId",
                table: "TimeSheetEntry",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeSheetEntry_TeacherId",
                table: "TimeSheetEntry",
                column: "TeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeSheetEntryStudent_StudentId",
                table: "TimeSheetEntryStudent",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_TimeSheetEntryStudent_TimeSheetEntryId",
                table: "TimeSheetEntryStudent",
                column: "TimeSheetEntryId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProtectorStudent_Protector_ProtectorId",
                table: "ProtectorStudent",
                column: "ProtectorId",
                principalTable: "Protector",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProtectorStudent_Student_StudentId",
                table: "ProtectorStudent",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProtectorStudent_Protector_ProtectorId",
                table: "ProtectorStudent");

            migrationBuilder.DropForeignKey(
                name: "FK_ProtectorStudent_Student_StudentId",
                table: "ProtectorStudent");

            migrationBuilder.DropTable(
                name: "ClassStudent");

            migrationBuilder.DropTable(
                name: "CourseFee");

            migrationBuilder.DropTable(
                name: "StudentCourseSubject");

            migrationBuilder.DropTable(
                name: "TimeSheetEntryStudent");

            migrationBuilder.DropTable(
                name: "ClassCentral");

            migrationBuilder.DropTable(
                name: "TimeSheetEntry");

            migrationBuilder.DropTable(
                name: "CourseSubject");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProtectorStudent",
                table: "ProtectorStudent");

            migrationBuilder.RenameTable(
                name: "ProtectorStudent",
                newName: "ProtectorStudents");

            migrationBuilder.RenameIndex(
                name: "IX_ProtectorStudent_StudentId",
                table: "ProtectorStudents",
                newName: "IX_ProtectorStudents_StudentId");

            migrationBuilder.RenameIndex(
                name: "IX_ProtectorStudent_ProtectorId",
                table: "ProtectorStudents",
                newName: "IX_ProtectorStudents_ProtectorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProtectorStudents",
                table: "ProtectorStudents",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "SubjectFees",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Fee = table.Column<double>(type: "float", nullable: false),
                    InvolveType = table.Column<int>(type: "int", nullable: false),
                    SubjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectFees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubjectFees_Subject_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubjectFees_SubjectId",
                table: "SubjectFees",
                column: "SubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProtectorStudents_Protector_ProtectorId",
                table: "ProtectorStudents",
                column: "ProtectorId",
                principalTable: "Protector",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProtectorStudents_Student_StudentId",
                table: "ProtectorStudents",
                column: "StudentId",
                principalTable: "Student",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
