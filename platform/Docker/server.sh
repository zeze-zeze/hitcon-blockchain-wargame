#!/usr/bin/env bash
COMPOSE="./docker-compose.yaml"

usage() {
    cat << EOF
Description:
    The script to control the hitcon wargame server

Usage:
    ./server.sh [Option] [Action]

Action:
    start   start server
    stop    stop server [-d]

Option:
    -h  show help
    -d  deleta all container
./
EOF
}

stop_container() {
    if [[ "$1" -eq 1 ]]; then
        docker-compose -f $COMPOSE down --volumes
    else
        docker-compose -f $COMPOSE down
    fi
}

start_container() {
    docker-compose -f $COMPOSE up -d --build
}

main() {
    while getopts "hd" opt; do
        case $opt in
            h)
                usage
                exit 1
                ;;
            d)
                DELETE_FLAG=1
                ;;
        esac
    done

    shift $((OPTIND -1))

        local ACTION=$1

    if [[ ! $ACTION ]]; then
        usage
        exit 1
    fi

    case $ACTION in 
        start)
            start_container
            ;;
        stop)
            echo "stop"
            stop_container $DELETE_FLAG
            ;;
        ?)
            usage
            exit 1
            ;;
    esac

}

main "$@"