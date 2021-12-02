-module(day01).

-export([run/1]).

run(Input) ->
    Numbers = lists:map(fun list_to_integer/1, Input),
    io:format("day01 part 1 => ~p~n", [part1(Numbers)]),
    io:format("day01 part 2 => ~p~n", [part2(Numbers)]).

part1(Numbers) -> part1(Numbers, 0).

part1(L, Acc) when length(L) =:= 1 -> Acc;
part1([F, S | Rest], Acc) when F < S -> part1([S|Rest], Acc + 1);
part1([F, S | Rest], Acc) when F > S -> part1([S|Rest], Acc).

part2(Numbers) -> part2(Numbers, 0).

part2(L, Acc) when length(L) =:= 3 ->
    Acc;
part2([Fst, Snd, Thd, Fth | Rest], Acc) ->
    case ((Fst + Snd + Thd) < (Snd + Thd + Fth)) of
        true -> part2([Snd|[Thd|[Fth|Rest]]], Acc +1);
        false -> part2([Snd|[Thd|[Fth|Rest]]], Acc)
    end.
