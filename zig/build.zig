const std = @import("std");

pub fn build(b: *std.Build) !void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});
    const zap = b.dependency("zap", .{
        .target = target,
        .optimize = optimize,
        .openssl = false, // set to true to enable TLS support
    });
    const exe = b.addExecutable(.{
        .name = "chessbuddy",
        .root_source_file = b.path("./chessbuddy.zig"),
        .target = target,
        .optimize = optimize,
    });
    exe.linkLibrary(zap.artifact("facil.io"));
    exe.root_module.addImport("zap", zap.module("zap"));

    // const ex_run = exe.run();
    const ex_run = b.addRunArtifact(exe);
    const ex_run_step = b.step("run-chessbuddy", "run the chessbuddy.exe");
    ex_run_step.dependOn(&ex_run.step);

    // install the artifact - depending on the "exe"
    const ex_build_step = b.addInstallArtifact(exe, .{});
    const ex_step = b.step("chessbuddy", "build the chessbuddy.exe");
    ex_step.dependOn(&ex_build_step.step);
}