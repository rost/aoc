-module(day08).

-export([run/1]).

run(Input) ->
    io:format("day08 part 2 => ~p~n", [part2(Input)]).

part2(Input) ->
    List = lists:map(fun(L) -> run_line(L) end, Input),
    Values = [list_to_integer(lists:flatten(L)) || L <- List],
    lists:sum(Values).

run_line(Line) ->
    [H|T] = string:split(Line, " | "),
    Segments = string:split(H, " ", all),
    Values = string:split(T, " ", all),
    Key = determine_key(Segments),
    F = fun(S) -> {_, V} = lists:keyfind(lists:usort(S), 1, Key), V end,
    lists:map(F, Values).

determine_key(Segments) ->
    Sorted = [lists:usort(S) || S <- Segments],
    Fives = [S || S <- Sorted, length(S) =:= 5],
    Sixes = [S || S <- Sorted, length(S) =:= 6],

    One = hd([S || S <- Sorted, length(S) =:= 2]),
    Seven = hd([S || S <- Sorted, length(S) =:= 3]),
    Four = hd([S || S <- Sorted, length(S) =:= 4]),
    Eight = hd([S || S <- Sorted, length(S) =:= 7]),

    % lower left is the missing piece of the number 9, (digital numbers), 9 -- 4 =:= 2 sides, 6 -- 4 =:= 3 sides, 6 -- 0 =:= 3 sides
    LowerLeft = hd([Eight -- S || S <- Sixes, (Eight -- S) > 1, length(S -- Four) =:= 2]),

    % of the five character strings 2, 5 and 3, the 2 is the only (digital number) we can remove the lowerleft side from
    Two = hd([S || S <- Fives, length(S -- LowerLeft) < length(S)]),
    % nine is an eight without the lowerleft side
    Nine = Eight -- LowerLeft,
    % of the six character strings 6, 9 and 0, the 6 is the only (digital number) we can remove the 1 from and have only one side removed
    Six = hd([S || S <- Sixes, S =/= Nine andalso length(S -- One) =:= length(S) - 1]),
    % three is part of the six char strings, but it is neither of the previously defined 9 or 6
    Zero = hd([S || S <- Sixes, S =/= Nine andalso S =/= Six]),
    % five is not the previously defined 2, and (digital numbers) 5 -- 1 removes one side/letter
    Five = hd([S || S <- Fives, S =/= Two andalso length(S -- One) =:= (length(S) - 1)]),
    % three is part of the five char strings, but it is neither of the previously defined 9 or 6
    Three = hd([S || S <- Fives, S =/= Two andalso S =/= Five]),

    [{Zero, "0"},
     {One, "1"},
     {Two, "2"},
     {Three, "3"},
     {Four, "4"},
     {Five, "5"},
     {Six, "6"},
     {Seven, "7"},
     {Eight, "8"},
     {Nine, "9"}].
