module Day02

let charToNumber (char: string) =
    if char = "A" || char = "X" then 1
    elif char = "B" || char = "Y" then 2
    elif char = "C" || char = "Z" then 3
    else 0

let score (round: string[]) =
    let chars = round |> Seq.toList
    let themScore = charToNumber chars.[0]
    let meScore = charToNumber chars.[1]
    let diff = themScore - meScore

    if diff = -2 || diff = 1 then [ themScore + 6; meScore ]
    elif diff = -1 || diff = 2 then [ themScore; meScore + 6 ]
    else [ themScore + 3; meScore + 3 ]

let part1 (input: string) =
    let lines = input.Split("\n")
    let rounds = lines |> Array.map (fun line -> line.Split(" "))
    let scores = rounds |> Array.map score
    let sumB = scores |> Array.sumBy (fun score -> score.[1])
    sumB

let numberToMeChar (num: int) =
    match num with
    | 1 -> "A"
    | 2 -> "B"
    | 3 -> "C"
    | _ -> ""

let shiftChar (char: string) (shift: int) =
    let num = charToNumber char

    match (num, shift) with
    | 2, _ -> numberToMeChar (num + shift)
    | 1, -1 -> numberToMeChar 3
    | 3, 1 -> numberToMeChar 1
    | _, _ -> numberToMeChar (num + shift)

let strategyToChar (them: string) (me: string) =
    match me with
    | "X" -> shiftChar them -1
    | "Y" -> them
    | "Z" -> shiftChar them +1
    | _ -> ""

let strategy_guide (round: string[]) =
    let chars = round |> Seq.toList
    let them = chars.[0]
    let me = chars.[1]
    let strategyB = strategyToChar them me
    [ them; strategyB ] |> Array.ofList

let part2 (input: string) =
    let lines = input.Split("\n")
    let rounds = lines |> Array.map (fun line -> line.Split(" "))
    let newRounds = rounds |> Array.map strategy_guide
    let scores = newRounds |> Array.map score
    let sumB = scores |> Array.sumBy (fun score -> score.[1])
    sumB

let run (input: string) =
    printfn "Day 02, part1: %A" (part1 input)
    printfn "Day 02, part2: %A" (part2 input)
