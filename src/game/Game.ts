import { GameConfig } from "../config";
import { getId } from "./id";

export class Game {
	private entities: Map<number, Entity> = new Map();

	constructor() {
		this.initMap();
	}


	initMap() {
		// Soon
	}


	createEntity(type, props, owner?): Entity {
		const id = getId();
		const entity: Entity = {
			id,
			blueprintId: type,
			props,			
			owner
		}
		this.entities.set(id, entity);
		return entity;
	}

	updateEntity(id, data) {
		const entity = this.entities.get(id);
		if (!entity) {
			console.warn(`Entity ${id} not found`);
			return;
		}
		for (const key in data) {
			if (!entity.props[key])
				entity.props[key] = {};
			const props = entity.props[key];
			const componentProps = data[key];
			entity.props[key] = {
				...props,
				...componentProps,
			}
		}
	}

	forEachEntities(callback: (entity: Entity) => void) {
		this.entities.forEach(callback);
	}

	getById(id): Entity | undefined {
		return this.entities.get(id)
	}

	deleteById(id) {
		this.entities.delete(id);
	}
}

export type EntityId = number;

export interface Entity {
	id: EntityId,
	owner?: string,
	blueprintId: string,
	props: object,
}
