module Day03

let priority (char: char) =
    let code = char |> int
    if code >= 97 then code - 96 else code - 38

let part1 (input: string) =
    let lines = input.Split("\n")

    let splitLines =
        lines
        |> Array.map (fun line -> line |> Seq.toList |> List.splitAt (line.Length / 2))

    let freqSets =
        splitLines |> Array.map (fun (f, s) -> (f |> Set.ofList, s |> Set.ofList))

    let overlaps =
        freqSets
        |> Array.map (fun (f, s) -> Set.intersect f s |> Set.toList)
        |> List.concat

    let sums = overlaps |> List.map priority
    sums |> List.sum

let part2 (input: string) =
    let lines = input.Trim().Split("\n")
    let groups = lines |> Array.chunkBySize 3

    let freqSets =
        groups
        |> Array.map (fun group ->
            group
            |> Array.map (fun line -> line.ToCharArray() |> Array.toList |> Set.ofList))

    let overlaps =
        freqSets
        |> Array.map (fun group ->
            let f = group.[0]
            let s = group.[1]
            let t = group.[2]
            Set.intersect f s |> Set.intersect t |> Set.toList)
        |> List.concat

    let sums = overlaps |> List.map priority
    sums |> List.sum

let run (input: string) =
    printfn "Day 03, part1: %A" (part1 input)
    printfn "Day 03, part2: %A" (part2 input)
