-module(day02).

-export([run/1]).

run(Input) ->
    io:format("day02 part 1 => ~p~n", [part1(Input)]),
    io:format("day02 part 2 => ~p~n", [part2(Input)]).

parse_op(Line) ->
    [Op, Val] = string:split(Line, " "),
    {list_to_atom(Op), list_to_integer(Val)}.

part1(Input) ->
    Ops = lists:map(fun parse_op/1, Input),
    Res = run_ops1(Ops, #{horizontal=>0, depth=>0}),
    #{depth:=D, horizontal:=H} = Res,
    D * H.

run_ops1([], Acc) -> Acc;
run_ops1([{forward, Val}|Rest], #{horizontal:=H} = Acc) ->
    run_ops1(Rest, Acc#{horizontal=>H + Val});
run_ops1([{up, Val}|Rest], #{depth:=D} = Acc) ->
    run_ops1(Rest, Acc#{depth=>D - Val});
run_ops1([{down, Val}|Rest], #{depth:=D} = Acc) ->
    run_ops1(Rest, Acc#{depth=>D + Val}).

part2(Input) ->
    Ops = lists:map(fun parse_op/1, Input),
    Res = run_ops2(Ops, {0, 0, 0}),
    {D, H, A} = Res,
    D * H.

run_ops2([], Acc) -> Acc;
run_ops2([{forward, Val}|Rest], {D, H, A} ) ->
    run_ops2(Rest, {D + (Val * A), H + Val, A});
run_ops2([{up, Val}|Rest], {D, H, A}) ->
    run_ops2(Rest, {D, H, A - Val});
run_ops2([{down, Val}|Rest], {D, H, A}) ->
    run_ops2(Rest, {D, H, A + Val}).
