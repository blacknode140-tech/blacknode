export function createSession(station, plan) {

    return {

        id: crypto.randomUUID(),

        stationId: station.id,

        stationName: station.name,

        plan: {

            id: plan.id,

            name: plan.name,

            minutes: plan.minutes,

            price: plan.price

        },

        startTime: null,

        expectedEndTime: null,
        remainingSeconds: plan.minutes * 60,

        extras: [],

        products: [],

        paymentMethod: null,

        totals: {

            game: plan.price,

            extras: 0,

            products: 0,

            total: plan.price

        },

        status: "active"

    };

}