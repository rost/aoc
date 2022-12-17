module Day01

let calories (input: string) n =
    input.Trim().Split("\n\n")
    |> Array.map (fun group -> group.Split("\n") |> Array.map int |> Array.sum)
    |> Array.sort
    |> Array.rev
    |> Array.take n
    |> Array.sum

let part1 (input: string) = calories input 1

let part2 (input: string) = calories input 3

let run (input: string) =
    printfn "Day 01, part1: %A" (part1 input)
    printfn "Day 01, part2: %A" (part2 input)
