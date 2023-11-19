import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store'
import { FeedZebra } from '../actions/feed-zebra.actions';
import { TakeAnimalsOutside } from '../actions/take-animal-outside.action';

export interface ZebraFood {
    name: string;
    hay: number;
    carrots: number;
}

export interface ZooStateModel {
    zebraFood: ZebraFood[];
}

@State<ZooStateModel>({
    name: 'zoo',
    defaults: {
        zebraFood: []
    }
})
@Injectable()
export class ZooState {
    @Action(FeedZebra)
    // feedZebra(ctx: StateContext<ZooStateModel>, action: FeedZebra) {
    //     const state = ctx.getState();
    //     ctx.setState({
    //         ...state,
    //         zebraFood: [
    //             ...state.zebraFood,
    //             action.zebraToFeed
    //         ]
    //     });
    // }
    feedZebra(ctx: StateContext<ZooStateModel>, action: FeedZebra) {
        const state = ctx.getState();
        ctx.patchState({
            zebraFood: [
                ...state.zebraFood,
                action.zebraToFeed
            ]
        });

        return ctx.dispatch(new TakeAnimalsOutside('vaca'));
    }
}