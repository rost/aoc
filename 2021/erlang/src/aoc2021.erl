-module(aoc2021).

%% API exports
-export([main/1]).

%% escript Entry point
main(_) ->
    day01:run(readInput("01")),
    day02:run(readInput("02")),
    day08:run(readInput("08")),
    erlang:halt(0).

%% Internal functions

readInput(Day) ->
    {ok, Binary} = file:read_file("../input/input" ++ Day ++ ".txt"),
    string:tokens(erlang:binary_to_list(Binary), "\n").
