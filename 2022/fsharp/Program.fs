// For more information see https://aka.ms/fsharp-console-apps

let readInput num =
    System.IO.File.ReadAllText $"../input/input{num}.txt"

[<EntryPoint>]
let main _args =
    Day01.run (readInput "01")
    0
