module Day04

let lineToPair (line: string) =
    line.Split(',')
    |> Array.toList
    |> List.map (fun s -> s.Split('-') |> Array.toList |> List.map int)

let contains (points: int list list) =
    match points with
    | [ f; s ] -> f.[0] <= s.[0] && f.[1] >= s.[1] || s.[0] <= f.[0] && s.[1] >= f.[1]
    | _ -> failwithf "Unexpected points: %A" points

let overlap (points: int list list) =
    match points with
    | [ [ fa; fb ]; [ sa; sb ] ] ->
        if fa >= sa && fa <= sb then true
        elif fb >= sa && fb <= sb then true
        elif sa >= fa && sb <= fb then true
        else false
    | _ -> failwithf "Unexpected points: %A" points

let pairs (input: string) (filterFun) =
    let lines = input.Split("\n")
    let pairs = lines |> Array.map lineToPair |> Array.toList
    let filteredPairs = pairs |> List.filter filterFun
    filteredPairs.Length

let part1 (input: string) = pairs input contains

let part2 (input: string) = pairs input overlap

let run (input: string) =
    printfn "Day 04, part1: %A" (part1 input) // 528
    printfn "Day 04, part2: %A" (part2 input) // 881
